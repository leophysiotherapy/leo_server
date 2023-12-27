import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

const PHONE_NUMBER_REGEX = /^\+[1-9]\d{6,14}$/;
export const GraphQLPhoneNumberDefault = /*#__PURE__*/ new GraphQLScalarType({
    name: 'PhoneNumber',
    serialize(value) {
        if (typeof value !== 'string') {
            throw new GraphQLError(`Value is not string: ${value}`);
        }
        if (!PHONE_NUMBER_REGEX.test(value)) {
            throw new GraphQLError(`Validation phone number “Please enter a valid phone number: (country code) + (area code)(local number)(+1xxxxxxxxxx)`);
        }
        return value;
    },
    parseValue(value) {
        if (typeof value !== 'string') {
            throw new GraphQLError(`Value is not string: ${value}`);
        }

        if (!PHONE_NUMBER_REGEX.test(value)) {
            throw new GraphQLError(`Validation phone number “Please enter a valid phone number: (country code) + (area code)(local number)(+1xxxxxxxxxx)`);
        }
        return value;
    },
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(`Can only validate strings as phone numbers but got a: ${ast.kind}`, { nodes: ast });
        }
        if (!PHONE_NUMBER_REGEX.test(ast.value)) {
            throw new GraphQLError(`Validation phone number “Please enter a valid phone number: (country code) + (area code)(local number)(+1xxxxxxxxxx)`, { nodes: ast });
        }
        return ast.value;
    },
    extensions: {
        codegenScalarType: 'string',
        jsonSchema: {
            title: 'PhoneNumber',
            type: 'string',
            pattern: PHONE_NUMBER_REGEX.source,

        },
    },
});
