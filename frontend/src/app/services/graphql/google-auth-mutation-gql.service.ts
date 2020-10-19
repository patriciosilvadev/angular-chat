import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { User } from 'src/app/store/models/user.model'

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthMutationGQLService extends Mutation <{ setUser: User }> {
  document = gql`
    mutation googleAuth($token: String!) {
      setUser(token: $token) {
        id
        name
        email
        picture
      }
    }
  `;
}
