import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  mutation putBoard($organisationId: ID!, $input: BoardInput!) {
    putBoard(
      organisationId: $organisationId
      input: $input
    ) {
      id
      name
      createdAt
      updatedAt
      tickets {
        name
        description
        status
      }
    }
  }
`;

export const CREATE_TICKET = gql`
  mutation putTicket($organisationId: ID!, $boardId: ID!, $ticketId: ID $input: TicketInput!) {
    putTicket(organisationId: $organisationId, boardId: $boardId, ticketId: $ticketId, input: $input) {
      id
      name
      description
      status
      visible
    }
  }
`;


export const DELETE_TICKET = gql`
  mutation deleteTicket($organisationId: ID!, $ticketId: ID!) {
    deleteTicket(organisationId: $organisationId, ticketId: $ticketId) {
      id
      name
      description
      status
      visible
    }
  }
`;