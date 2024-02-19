import { gql } from "@apollo/client";

export const GET_ORGANIZATION_BOARDS = gql`
  query organisation($organisationId: ID!) {
    organisation(organisationId: $organisationId) {
      id
      name
      timezone
      createdAt
      updatedAt
      boards {
        id
        name
      }
    }
  }
`;

export const GET_TICKETS = gql`
  query board($organisationId: ID!, $boardId: ID!) {
    board(organisationId: $organisationId, boardId: $boardId) {
      id
      name
      createdAt
      updatedAt
      tickets {
        id
        name
        description
        status
      }  
    }
  }
`;