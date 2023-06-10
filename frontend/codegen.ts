import type { CodegenConfig } from '@graphql-codegen/cli'
import { environment } from './src/environments/environment';

const config: CodegenConfig = {
  schema: `${environment.api_url}/graphql`,
//   documents: './src/**/*.ts',
  documents: './src/**/*.graphql',
  generates: {
    './src/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular']
    }
  }
}
export default config