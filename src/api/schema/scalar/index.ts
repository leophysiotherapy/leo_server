

import { GraphQLPhoneNumber, GraphQLEmailAddress, GraphQLURL, GraphQLDateTime, GraphQLDate, GraphQLTime, GraphQLBigInt } from 'graphql-scalars'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import { asNexusMethod } from 'nexus'

export const emailGQL = asNexusMethod(GraphQLEmailAddress, "email");
export const phoneGQL = asNexusMethod(GraphQLPhoneNumber, "phone");
export const url = asNexusMethod(GraphQLURL, "url");
export const dateTime = asNexusMethod(GraphQLDateTime, "datetime");
export const date = asNexusMethod(GraphQLDate, "date");
export const time = asNexusMethod(GraphQLTime, "time");
export const uploadGQL = asNexusMethod(GraphQLUpload, "upload")
export const BigNumber = asNexusMethod(GraphQLBigInt, "bigInt")