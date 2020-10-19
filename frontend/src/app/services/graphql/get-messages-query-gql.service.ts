import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Message } from 'src/app/store/models/message.model';

@Injectable({
  providedIn: 'root',
})
export class GetMessagesQueryGQLService extends Query <{ getMessages: Message[] }> {
  document = gql`
    query getMessages {
      getMessages {
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
