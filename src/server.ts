import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import Nexus from 'nexus'
import { createServer } from "node:http"
import { format, join } from 'node:path'
import { expressMiddleware } from '@apollo/server/express4';
import { useServer } from 'graphql-ws/lib/use/ws'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import GraphQLUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'
import cookieParser from 'cookie-parser';
import { WebSocketServer } from 'ws';

const { makeSchema, declarativeWrappingPlugin } = Nexus

const { json } = bodyParser

dotenv.config();


import * as User from './api/schema/user/user.js'
import * as Scalar from './api/schema/scalar/index.js'
import * as FAQs from './api/schema/faqs/faqs.js'
import * as Prescription from './api/schema/prescriptions/prescription.js'
import * as Equipment from './api/schema/equipement/equipement.js'
import * as Appointment from './api/schema/appointment/appointment.js'
import * as Diagnosis from './api/schema/diagnosis/diagnosis.js'
import * as Service from './api/schema/services/service.js'
import * as PreDiagnosticForm from './api/schema/prediagform/prediagform.js'

(async function StartAppolloServe() {

    const app = express()


    const httpServer = createServer(app)


    const schema = makeSchema({
        types: [ User, Scalar, FAQs, Prescription, Equipment, Appointment, Diagnosis, Service, PreDiagnosticForm ],
        outputs: {
            schema: join(process.cwd(), "/src/api/generated/schema.graphql"),
            typegen: join(process.cwd(), "/src/api/generated/schema.ts")
        },
        plugins: [ declarativeWrappingPlugin() ],

    })

    app.use(cookieParser())
    app.use(GraphQLUploadExpress())

    const wsServer = new WebSocketServer({
        path: "/graphql",
        server: httpServer
    })

    const serverCleanup = useServer({ schema }, wsServer)

    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        introspection: true,
        formatError: (formattedError, error) => {
            if (formattedError.message.includes("phone") || formattedError.message.includes("emergencyPhone")) {
                return { message: "Validation phone number “Please enter a valid phone number: (country code) + (area code)(local number)(+1xxxxxxxxxx)" }
            }

            if (formattedError.message.includes("email")) {
                return { message: "Email is required" }
            }
            return formattedError
        },
        plugins: [ ApolloServerPluginLandingPageLocalDefault(), ApolloServerPluginDrainHttpServer({ httpServer }), {
            async serverWillStart() {
                return {
                    async drainServer() {
                        serverCleanup.dispose()

                    },
                }
            }
        } ],

    })

    await server.start()


    app.use("/graphql", cors<cors.CorsRequest>({
        credentials: true,
        origin: [ "https://www.leonardophysiotherapy.com", "https://studio.apollographql.com", "http://localhost:3000" ]
    }), json(), expressMiddleware(server, {
        context: async ({ req, res }) => ({ req, res })
    }))

    await new Promise(() => {
        httpServer.listen({ port: process.env.PORT || 4000 })
        console.log(`Server is running at port 4000 🚀 `)
    })
})()