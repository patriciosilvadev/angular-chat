import { Injectable } from '@angular/core';
import { Subscription } from 'apollo-angular';
import gql from 'graphql-tag';
import { Message } from 'src/app/store/models/message.model';
@Injectable({
  providedIn: 'root',
})
export class NewMessageSubscriptionGQLService extends Subscription <{ newMessage: Message }> {
  document = gql`
    subscription newMessage {
      newMessage {
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
