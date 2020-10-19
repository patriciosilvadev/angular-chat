import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { Message } from 'src/app/store/models/message.model'

@Injectable({
  providedIn: 'root',
})
export class SendMessageMutationGQLService extends Mutation <{ sendMessage: Message }> {
  document = gql`
    mutation sendMessage($user: ID!, $content: String!) {
      sendMessage(user: $user, content: $content) {
        id
        content
        createdAt
        user {
          id
          name
          email
          picture
        }
      }
    }
  `;
}
