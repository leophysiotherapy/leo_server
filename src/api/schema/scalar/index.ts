

import { GraphQLPhoneNumber, GraphQLEmailAddress, GraphQLURL, GraphQLDateTime, GraphQLDate, GraphQLTime } from 'graphql-scalars'
import { asNexusMethod } from 'nexus'

export const emailGQL = asNexusMethod(GraphQLEmailAddress, "email");
export const phoneGQL = asNexusMethod(GraphQLPhoneNumber, "phone");
export const url = asNexusMethod(GraphQLURL, "url");
export const dateTime = asNexusMethod(GraphQLDateTime, "datetime");
export const date = asNexusMethod(GraphQLDate, "date");
export const time = asNexusMethod(GraphQLTime, "time");