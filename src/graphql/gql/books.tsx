import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
    query Books{
        books{
            id
            title
            image_url
            publisher
            subtitle
            release_date
            authors{
                name
            }
            tags{
                name
            }
            available_copies
            number_of_purchases
            full_description
            genres{
              name
            }
            price
            likes
            rating
        }
    }
`