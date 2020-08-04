import React, { useCallback, useRef } from 'react';
import { FiSave } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import mysql from 'mysql2/promise';
import { useSetRecoilState } from 'recoil';

import { connectionsState, IConnection } from '../../../atoms/connections';
import { connections } from '../../../store/connections';

import { useToast } from '../../../hooks/toast';

import Modal from '../../../components/Modal';
import Input from '../../../components/Form/Input';
import Button from '../../../components/Button';

import getValidationErrors from '../../../utils/getValidationErrors';

import {
  HostInputGroup,
  UsernameInputGroup,
  ActionsContainer,
  ButtonGroup,
} from './styles';

interface ConnectionFormModalProps {
  visible?: boolean;
  onRequestClose(): void;
}

interface ConnectionFormData {
  name: string;
  host: string;
  port: string;
  user: string;
  password: string;
}

const ConnectionFormModal: React.FC<ConnectionFormModalProps> = ({
  visible,
  onRequestClose,
}) => {
  const formRef = useRef<FormHandles>(null);

  const setConnections = useSetRecoilState(connectionsState);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ConnectionFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(),
          host: Yup.string().required(),
          port: Yup.string().required(),
          user: Yup.string().required(),
          password: Yup.string().required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const currentConnections = connections.get('connections') as Array<
          IConnection
        >;

        const exists = currentConnections.find(
          findConnection => findConnection.name === data.name,
        );

        if (exists) {
          throw new Error('Connection name already exists.');
        }

        const updatedConnections = [
          ...currentConnections,
          { ...data, port: Number(data.port) },
        ];

        connections.set('connections', updatedConnections);

        setConnections(updatedConnections);

        addToast({
          type: 'success',
          title: 'Connection saved',
          description: 'You can now connect to your database!',
        });

        onRequestClose();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Deu merda carai',
          description: err.message,
        });
      }
    },
    [addToast, onRequestClose, setConnections],
  );

  const testConnection = useCallback(async () => {
    const { host, port, user, password } = formRef.current?.getData() as Omit<
      IConnection,
      'name'
    >;

    const options = {
      host,
      port,
      user,
      password,
    };

    try {
      await mysql.createConnection(options);

      addToast({
        type: 'success',
        title: 'foi',
        description: 'vrau',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Algo de errado não está certo!',
        description: err.message,
      });
    }
  }, [addToast]);

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>New connection</h1>

        <Input name="name" label="Connection name" />

        <HostInputGroup>
          <Input name="host" label="Host" />
          <Input name="port" label="Port" />
        </HostInputGroup>

        <UsernameInputGroup>
          <Input name="user" label="User" />
          <Input
            name="password"
            type="password"
            label="Password"
            hint="Leave empty for no password"
          />
        </UsernameInputGroup>

        <ActionsContainer>
          <Button type="button" color="pink" onClick={testConnection}>
            Test connection
          </Button>

          <ButtonGroup>
            <Button type="button" color="opaque" onClick={onRequestClose}>
              Cancel
            </Button>
            <Button type="submit" color="purple">
              <FiSave />
              Save
            </Button>
          </ButtonGroup>
        </ActionsContainer>
      </Form>
    </Modal>
  );
};

export default ConnectionFormModal;
