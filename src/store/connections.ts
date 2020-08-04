import Store from 'electron-store';
import { JSONSchemaType } from 'json-schema-typed';

export const connections = new Store({
  schema: {
    connections: {
      type: JSONSchemaType.Array,
      default: [],
      items: {
        type: JSONSchemaType.Object,
        default: {},
        properties: {
          name: {
            type: JSONSchemaType.String,
            default: '',
          },
          host: {
            type: JSONSchemaType.String,
            default: '',
          },
          port: {
            type: JSONSchemaType.Number,
            default: '',
          },
          user: {
            type: JSONSchemaType.String,
            default: '',
          },
          password: {
            type: JSONSchemaType.String,
            default: '',
          },
        },
      },
    },
  },
});
