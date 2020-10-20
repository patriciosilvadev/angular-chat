import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { WebSocketLink } from 'apollo-link-ws';
import { environment } from 'src/environments/environment';

const uri = environment.api_url;

// FIXME todas as requests estão usando WebSockets, se quiser colocar cada request em sua URI especifica é mais complexo
export function createApollo() {
  return {
    cache: new InMemoryCache(),
    link: new WebSocketLink({
      uri,
      options: {
        reconnect: true,
        // connectionParams: {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('token')}`,
        //   },
        // },
      },
    }),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
