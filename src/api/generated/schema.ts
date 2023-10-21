/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     */
    bigInt<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "BigInt";
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    /**
     * A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address.
     */
    email<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "EmailAddress";
    /**
     * A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234.
     */
    phone<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "PhoneNumber";
    /**
     * A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    time<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Time";
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Upload";
    /**
     * A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.
     */
    url<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "URL";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     */
    bigInt<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "BigInt";
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address.
     */
    email<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "EmailAddress";
    /**
     * A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234.
     */
    phone<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "PhoneNumber";
    /**
     * A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    time<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Time";
    /**
     * The `Upload` scalar type represents a file upload.
     */
    upload<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Upload";
    /**
     * A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.
     */
    url<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "URL";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  appointmentInput: { // input type
    amount?: number | null; // Int
    date?: NexusGenScalars['Date'] | null; // Date
    services?: string | null; // String
    time?: string | null; // String
  }
  blogInput: { // input type
    content?: string | null; // String
    expertise?: string | null; // String
    file?: NexusGenScalars['Upload'] | null; // Upload
    title?: string | null; // String
  }
  equipmentInput: { // input type
    description?: string | null; // String
    expireDate?: NexusGenScalars['Date'] | null; // Date
    name?: string | null; // String
    quantity?: number | null; // Int
  }
  faqsInput: { // input type
    answer?: string | null; // String
    faqs?: string | null; // String
  }
  prescriptionInput: { // input type
    prescription?: string | null; // String
  }
  userInput: { // input type
    designation?: string | null; // String
    email?: NexusGenScalars['EmailAddress'] | null; // EmailAddress
    emergencyPhone?: NexusGenScalars['PhoneNumber'] | null; // PhoneNumber
    expertise?: string | null; // String
    firstname?: string | null; // String
    lastname?: string | null; // String
    password?: string | null; // String
    phone?: NexusGenScalars['PhoneNumber'] | null; // PhoneNumber
  }
}

export interface NexusGenEnums {
  inventory: "equipment" | "supplies"
  platform: "f2f" | "online"
  roles: "admin" | "patient" | "staff"
  status: "canceled" | "done" | "finished" | "upcoming"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  BigInt: any
  Date: any
  DateTime: any
  EmailAddress: any
  PhoneNumber: any
  Time: any
  URL: any
  Upload: any
}

export interface NexusGenObjects {
  EquipmentExpiration: { // root type
    count?: number | null; // Int
  }
  Mutation: {};
  OTP: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    expiredAt?: NexusGenScalars['DateTime'] | null; // DateTime
    otp?: string | null; // String
    otpID?: string | null; // ID
  }
  Query: {};
  Subscription: {};
  appointment: { // root type
    amount?: number | null; // Int
    appointmentID?: string | null; // ID
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    date?: NexusGenScalars['Date'] | null; // Date
    link?: string | null; // String
    platform?: string | null; // String
    services?: string | null; // String
    status?: string | null; // String
    time?: string | null; // String
  }
  appointmentChart: { // root type
    _all?: number | null; // Int
    createdAt?: NexusGenScalars['Date'] | null; // Date
  }
  avatar: { // root type
    avatar?: string | null; // String
    avatarID?: string | null; // ID
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  blog: { // root type
    blogsID?: string | null; // ID
    content?: string | null; // String
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    expertise?: string | null; // String
    image?: string | null; // String
    title?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  diagnosis: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    diagnosis?: string | null; // String
    diagnosisID?: string | null; // ID
  }
  equipment: { // root type
    description?: string | null; // String
    equipmentID?: string | null; // ID
    expireDate?: NexusGenScalars['DateTime'] | null; // DateTime
    name?: string | null; // String
    quantity?: number | null; // Int
  }
  faqs: { // root type
    answer?: string | null; // String
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    faqs?: string | null; // String
    faqsID?: string | null; // ID
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  feedback: { // root type
    creatdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    feedback?: string | null; // String
    feedbackID?: string | null; // ID
    rating?: number | null; // Int
  }
  prescription: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    prescription?: string | null; // String
    prescriptionID?: string | null; // ID
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  profile: { // root type
    designation?: string | null; // String
    emergencyPhone?: NexusGenScalars['PhoneNumber'] | null; // PhoneNumber
    expertise?: string | null; // String
    firstname?: string | null; // String
    lastname?: string | null; // String
    phone?: NexusGenScalars['PhoneNumber'] | null; // PhoneNumber
    profileID?: string | null; // ID
  }
  token: { // root type
    token?: string | null; // String
  }
  user: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    email?: NexusGenScalars['EmailAddress'] | null; // EmailAddress
    password?: string | null; // String
    role?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    userID?: string | null; // ID
    verified?: boolean | null; // Boolean
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  EquipmentExpiration: { // field return type
    count: number | null; // Int
  }
  Mutation: { // field return type
    cancelAdminAppointment: NexusGenRootTypes['appointment'] | null; // appointment
    canceledAppointment: NexusGenRootTypes['appointment'] | null; // appointment
    createAdminAccount: NexusGenRootTypes['user'] | null; // user
    createAppointment: NexusGenRootTypes['appointment'] | null; // appointment
    createBlogPost: NexusGenRootTypes['blog'] | null; // blog
    createEquipment: NexusGenRootTypes['equipment'] | null; // equipment
    createFAQs: NexusGenRootTypes['faqs'] | null; // faqs
    createMyFeedback: NexusGenRootTypes['feedback'] | null; // feedback
    createOTP: NexusGenRootTypes['OTP'] | null; // OTP
    createOldPatient: NexusGenRootTypes['user'] | null; // user
    createPatientAccount: NexusGenRootTypes['user'] | null; // user
    createPatientDiagnosis: NexusGenRootTypes['diagnosis'] | null; // diagnosis
    createPatientPrescription: NexusGenRootTypes['prescription'] | null; // prescription
    createProfileAvatar: NexusGenRootTypes['avatar'] | null; // avatar
    createSMSNotification: boolean | null; // Boolean
    createStaffAccount: NexusGenRootTypes['user'] | null; // user
    deleteAppointment: NexusGenRootTypes['appointment'] | null; // appointment
    deleteBlogPost: NexusGenRootTypes['blog'] | null; // blog
    deleteEquipment: NexusGenRootTypes['equipment'] | null; // equipment
    deleteFAQs: NexusGenRootTypes['faqs'] | null; // faqs
    deleteMyFeedback: NexusGenRootTypes['feedback'] | null; // feedback
    deletePatientDiagnosis: NexusGenRootTypes['diagnosis'] | null; // diagnosis
    deletePrescrpition: NexusGenRootTypes['prescription'] | null; // prescription
    deleteUserAcc: NexusGenRootTypes['user'] | null; // user
    findEmailAddress: NexusGenRootTypes['user'] | null; // user
    login: NexusGenRootTypes['token'] | null; // token
    resetUserPassword: NexusGenRootTypes['user'] | null; // user
    updateAppointment: NexusGenRootTypes['appointment'] | null; // appointment
    updateAppointmentSession: NexusGenRootTypes['appointment'] | null; // appointment
    updateBlogsPost: NexusGenRootTypes['blog'] | null; // blog
    updateContactNumber: NexusGenRootTypes['profile'] | null; // profile
    updateDateAppointment: NexusGenRootTypes['appointment'] | null; // appointment
    updateEquipment: NexusGenRootTypes['equipment'] | null; // equipment
    updateFAQs: NexusGenRootTypes['faqs'] | null; // faqs
    updateOlPatient: NexusGenRootTypes['user'] | null; // user
    updatePassword: NexusGenRootTypes['user'] | null; // user
    updatePatientAccount: NexusGenRootTypes['user'] | null; // user
    updatePatientDiagnosis: NexusGenRootTypes['diagnosis'] | null; // diagnosis
    updatePrescription: NexusGenRootTypes['prescription'] | null; // prescription
    updateStaffAccount: NexusGenRootTypes['user'] | null; // user
    updateUserVerifiedAcc: NexusGenRootTypes['user'] | null; // user
    verifyOTP: NexusGenRootTypes['OTP'] | null; // OTP
  }
  OTP: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    expiredAt: NexusGenScalars['DateTime'] | null; // DateTime
    otp: string | null; // String
    otpID: string | null; // ID
  }
  Query: { // field return type
    getAllAppointment: Array<NexusGenRootTypes['appointment'] | null> | null; // [appointment]
    getAllAppointmentID: Array<NexusGenRootTypes['appointment'] | null> | null; // [appointment]
    getAllAppointmentToday: Array<NexusGenRootTypes['appointment'] | null> | null; // [appointment]
    getAllBlogsPost: Array<NexusGenRootTypes['blog'] | null> | null; // [blog]
    getAllDiagnosis: Array<NexusGenRootTypes['diagnosis'] | null> | null; // [diagnosis]
    getAllEquipment: Array<NexusGenRootTypes['equipment'] | null> | null; // [equipment]
    getAllFAQs: Array<NexusGenRootTypes['faqs'] | null> | null; // [faqs]
    getAllFeedback: Array<NexusGenRootTypes['feedback'] | null> | null; // [feedback]
    getAllFeedbackByUserId: Array<NexusGenRootTypes['feedback'] | null> | null; // [feedback]
    getAllPatientAppointment: Array<NexusGenRootTypes['appointment'] | null> | null; // [appointment]
    getAllPhysioId: Array<NexusGenRootTypes['user'] | null> | null; // [user]
    getAllPhysioPatient: Array<NexusGenRootTypes['user'] | null> | null; // [user]
    getAllPhysioUserBySearch: Array<NexusGenRootTypes['user'] | null> | null; // [user]
    getAllPrescription: Array<NexusGenRootTypes['prescription'] | null> | null; // [prescription]
    getAllUser: Array<NexusGenRootTypes['user'] | null> | null; // [user]
    getAppointmentByDateTime: Array<NexusGenRootTypes['appointment'] | null> | null; // [appointment]
    getAppointmentByPlatform: Array<NexusGenRootTypes['appointment'] | null> | null; // [appointment]
    getAppointmentByplatform: Array<NexusGenRootTypes['appointment'] | null> | null; // [appointment]
    getBlogSearch: Array<NexusGenRootTypes['blog'] | null> | null; // [blog]
    getDiagnosisID: Array<NexusGenRootTypes['diagnosis'] | null> | null; // [diagnosis]
    getFeedbackById: Array<NexusGenRootTypes['feedback'] | null> | null; // [feedback]
    getFindFAQsQuestion: Array<NexusGenRootTypes['faqs'] | null> | null; // [faqs]
    getFindPrescription: Array<NexusGenRootTypes['prescription'] | null> | null; // [prescription]
    getInventoryBySearch: Array<NexusGenRootTypes['equipment'] | null> | null; // [equipment]
    getInventoryExpiration: number | null; // Int
    getPhysioUserByRole: Array<NexusGenRootTypes['user'] | null> | null; // [user]
    getPrescriptionsById: Array<NexusGenRootTypes['prescription'] | null> | null; // [prescription]
    getReportsByPlatform: Array<NexusGenRootTypes['appointmentChart'] | null> | null; // [appointmentChart]
    getSearchuserByRole: Array<NexusGenRootTypes['user'] | null> | null; // [user]
  }
  Subscription: { // field return type
    FAQsSubscriptions: NexusGenRootTypes['faqs'] | null; // faqs
    InventorySubscriptions: NexusGenRootTypes['equipment'] | null; // equipment
    UserSubscriptions: NexusGenRootTypes['user'] | null; // user
  }
  appointment: { // field return type
    amount: number | null; // Int
    appointmentID: string | null; // ID
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    date: NexusGenScalars['Date'] | null; // Date
    link: string | null; // String
    patients: Array<NexusGenRootTypes['user'] | null> | null; // [user]
    platform: string | null; // String
    services: string | null; // String
    status: string | null; // String
    time: string | null; // String
  }
  appointmentChart: { // field return type
    _all: number | null; // Int
    createdAt: NexusGenScalars['Date'] | null; // Date
  }
  avatar: { // field return type
    avatar: string | null; // String
    avatarID: string | null; // ID
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  blog: { // field return type
    author: Array<NexusGenRootTypes['user'] | null> | null; // [user]
    blogsID: string | null; // ID
    content: string | null; // String
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    expertise: string | null; // String
    image: string | null; // String
    title: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  diagnosis: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    diagnosis: string | null; // String
    diagnosisID: string | null; // ID
    patient: Array<NexusGenRootTypes['user'] | null> | null; // [user]
  }
  equipment: { // field return type
    description: string | null; // String
    equipmentID: string | null; // ID
    expireDate: NexusGenScalars['DateTime'] | null; // DateTime
    name: string | null; // String
    quantity: number | null; // Int
  }
  faqs: { // field return type
    answer: string | null; // String
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    faqs: string | null; // String
    faqsID: string | null; // ID
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  feedback: { // field return type
    appointment: Array<NexusGenRootTypes['appointment'] | null> | null; // [appointment]
    creatdAt: NexusGenScalars['DateTime'] | null; // DateTime
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    feedback: string | null; // String
    feedbackID: string | null; // ID
    rating: number | null; // Int
    users: Array<NexusGenRootTypes['user'] | null> | null; // [user]
  }
  prescription: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    patient: Array<NexusGenRootTypes['user'] | null> | null; // [user]
    prescription: string | null; // String
    prescriptionID: string | null; // ID
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  profile: { // field return type
    avatar: Array<NexusGenRootTypes['avatar'] | null> | null; // [avatar]
    designation: string | null; // String
    emergencyPhone: NexusGenScalars['PhoneNumber'] | null; // PhoneNumber
    expertise: string | null; // String
    firstname: string | null; // String
    fullname: string | null; // String
    lastname: string | null; // String
    phone: NexusGenScalars['PhoneNumber'] | null; // PhoneNumber
    profileID: string | null; // ID
  }
  token: { // field return type
    token: string | null; // String
  }
  user: { // field return type
    appointment: Array<NexusGenRootTypes['appointment'] | null> | null; // [appointment]
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    diagnosis: Array<NexusGenRootTypes['diagnosis'] | null> | null; // [diagnosis]
    email: NexusGenScalars['EmailAddress'] | null; // EmailAddress
    password: string | null; // String
    prescription: Array<NexusGenRootTypes['prescription'] | null> | null; // [prescription]
    profile: Array<NexusGenRootTypes['profile'] | null> | null; // [profile]
    role: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    userID: string | null; // ID
    verified: boolean | null; // Boolean
  }
}

export interface NexusGenFieldTypeNames {
  EquipmentExpiration: { // field return type name
    count: 'Int'
  }
  Mutation: { // field return type name
    cancelAdminAppointment: 'appointment'
    canceledAppointment: 'appointment'
    createAdminAccount: 'user'
    createAppointment: 'appointment'
    createBlogPost: 'blog'
    createEquipment: 'equipment'
    createFAQs: 'faqs'
    createMyFeedback: 'feedback'
    createOTP: 'OTP'
    createOldPatient: 'user'
    createPatientAccount: 'user'
    createPatientDiagnosis: 'diagnosis'
    createPatientPrescription: 'prescription'
    createProfileAvatar: 'avatar'
    createSMSNotification: 'Boolean'
    createStaffAccount: 'user'
    deleteAppointment: 'appointment'
    deleteBlogPost: 'blog'
    deleteEquipment: 'equipment'
    deleteFAQs: 'faqs'
    deleteMyFeedback: 'feedback'
    deletePatientDiagnosis: 'diagnosis'
    deletePrescrpition: 'prescription'
    deleteUserAcc: 'user'
    findEmailAddress: 'user'
    login: 'token'
    resetUserPassword: 'user'
    updateAppointment: 'appointment'
    updateAppointmentSession: 'appointment'
    updateBlogsPost: 'blog'
    updateContactNumber: 'profile'
    updateDateAppointment: 'appointment'
    updateEquipment: 'equipment'
    updateFAQs: 'faqs'
    updateOlPatient: 'user'
    updatePassword: 'user'
    updatePatientAccount: 'user'
    updatePatientDiagnosis: 'diagnosis'
    updatePrescription: 'prescription'
    updateStaffAccount: 'user'
    updateUserVerifiedAcc: 'user'
    verifyOTP: 'OTP'
  }
  OTP: { // field return type name
    createdAt: 'DateTime'
    expiredAt: 'DateTime'
    otp: 'String'
    otpID: 'ID'
  }
  Query: { // field return type name
    getAllAppointment: 'appointment'
    getAllAppointmentID: 'appointment'
    getAllAppointmentToday: 'appointment'
    getAllBlogsPost: 'blog'
    getAllDiagnosis: 'diagnosis'
    getAllEquipment: 'equipment'
    getAllFAQs: 'faqs'
    getAllFeedback: 'feedback'
    getAllFeedbackByUserId: 'feedback'
    getAllPatientAppointment: 'appointment'
    getAllPhysioId: 'user'
    getAllPhysioPatient: 'user'
    getAllPhysioUserBySearch: 'user'
    getAllPrescription: 'prescription'
    getAllUser: 'user'
    getAppointmentByDateTime: 'appointment'
    getAppointmentByPlatform: 'appointment'
    getAppointmentByplatform: 'appointment'
    getBlogSearch: 'blog'
    getDiagnosisID: 'diagnosis'
    getFeedbackById: 'feedback'
    getFindFAQsQuestion: 'faqs'
    getFindPrescription: 'prescription'
    getInventoryBySearch: 'equipment'
    getInventoryExpiration: 'Int'
    getPhysioUserByRole: 'user'
    getPrescriptionsById: 'prescription'
    getReportsByPlatform: 'appointmentChart'
    getSearchuserByRole: 'user'
  }
  Subscription: { // field return type name
    FAQsSubscriptions: 'faqs'
    InventorySubscriptions: 'equipment'
    UserSubscriptions: 'user'
  }
  appointment: { // field return type name
    amount: 'Int'
    appointmentID: 'ID'
    createdAt: 'DateTime'
    date: 'Date'
    link: 'String'
    patients: 'user'
    platform: 'String'
    services: 'String'
    status: 'String'
    time: 'String'
  }
  appointmentChart: { // field return type name
    _all: 'Int'
    createdAt: 'Date'
  }
  avatar: { // field return type name
    avatar: 'String'
    avatarID: 'ID'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  blog: { // field return type name
    author: 'user'
    blogsID: 'ID'
    content: 'String'
    createdAt: 'DateTime'
    expertise: 'String'
    image: 'String'
    title: 'String'
    updatedAt: 'DateTime'
  }
  diagnosis: { // field return type name
    createdAt: 'DateTime'
    diagnosis: 'String'
    diagnosisID: 'ID'
    patient: 'user'
  }
  equipment: { // field return type name
    description: 'String'
    equipmentID: 'ID'
    expireDate: 'DateTime'
    name: 'String'
    quantity: 'Int'
  }
  faqs: { // field return type name
    answer: 'String'
    createdAt: 'DateTime'
    faqs: 'String'
    faqsID: 'ID'
    updatedAt: 'DateTime'
  }
  feedback: { // field return type name
    appointment: 'appointment'
    creatdAt: 'DateTime'
    createdAt: 'DateTime'
    feedback: 'String'
    feedbackID: 'ID'
    rating: 'Int'
    users: 'user'
  }
  prescription: { // field return type name
    createdAt: 'DateTime'
    patient: 'user'
    prescription: 'String'
    prescriptionID: 'ID'
    updatedAt: 'DateTime'
  }
  profile: { // field return type name
    avatar: 'avatar'
    designation: 'String'
    emergencyPhone: 'PhoneNumber'
    expertise: 'String'
    firstname: 'String'
    fullname: 'String'
    lastname: 'String'
    phone: 'PhoneNumber'
    profileID: 'ID'
  }
  token: { // field return type name
    token: 'String'
  }
  user: { // field return type name
    appointment: 'appointment'
    createdAt: 'DateTime'
    diagnosis: 'diagnosis'
    email: 'EmailAddress'
    password: 'String'
    prescription: 'prescription'
    profile: 'profile'
    role: 'String'
    updatedAt: 'DateTime'
    userID: 'ID'
    verified: 'Boolean'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    cancelAdminAppointment: { // args
      appointmentID: string; // ID!
      reason: string; // String!
    }
    canceledAppointment: { // args
      appointmentID: string; // ID!
    }
    createAdminAccount: { // args
      user?: NexusGenInputs['userInput'] | null; // userInput
    }
    createAppointment: { // args
      appointment?: NexusGenInputs['appointmentInput'] | null; // appointmentInput
      end: string; // String!
      platform?: NexusGenEnums['platform'] | null; // platform
      userID: string; // ID!
    }
    createBlogPost: { // args
      blog?: NexusGenInputs['blogInput'] | null; // blogInput
      userID: string; // ID!
    }
    createEquipment: { // args
      equipment?: NexusGenInputs['equipmentInput'] | null; // equipmentInput
      inventory?: NexusGenEnums['inventory'] | null; // inventory
      userID: string; // ID!
    }
    createFAQs: { // args
      faqs: NexusGenInputs['faqsInput']; // faqsInput!
      userID: string; // ID!
    }
    createMyFeedback: { // args
      appointmentID: string; // ID!
      feedback: string; // String!
      rating: number; // Int!
      userID: string; // ID!
    }
    createOTP: { // args
      email: NexusGenScalars['EmailAddress']; // EmailAddress!
    }
    createOldPatient: { // args
      diagnosis: string; // String!
      prescription: string; // String!
      user?: NexusGenInputs['userInput'] | null; // userInput
    }
    createPatientAccount: { // args
      user?: NexusGenInputs['userInput'] | null; // userInput
    }
    createPatientDiagnosis: { // args
      diagnosis: string; // ID!
      userID: string; // ID!
    }
    createPatientPrescription: { // args
      prescription: NexusGenInputs['prescriptionInput']; // prescriptionInput!
      userID: string; // ID!
    }
    createProfileAvatar: { // args
      avatar: string; // String!
      profileID: string; // ID!
    }
    createSMSNotification: { // args
      phoneNumber: NexusGenScalars['PhoneNumber']; // PhoneNumber!
    }
    createStaffAccount: { // args
      file?: NexusGenScalars['Upload'] | null; // Upload
      user?: NexusGenInputs['userInput'] | null; // userInput
    }
    deleteAppointment: { // args
      appointmentID: string; // ID!
    }
    deleteBlogPost: { // args
      blogsID: string; // ID!
    }
    deleteEquipment: { // args
      equipmentID: string; // ID!
    }
    deleteFAQs: { // args
      faqsID: string; // ID!
    }
    deleteMyFeedback: { // args
      feedbackID: string; // ID!
    }
    deletePatientDiagnosis: { // args
      diagnosisID: string; // ID!
    }
    deletePrescrpition: { // args
      prescriptionID: string; // ID!
    }
    deleteUserAcc: { // args
      userID: string; // ID!
    }
    findEmailAddress: { // args
      email: NexusGenScalars['EmailAddress']; // EmailAddress!
    }
    login: { // args
      email: string; // ID!
      password: string; // String!
    }
    resetUserPassword: { // args
      email: NexusGenScalars['EmailAddress']; // EmailAddress!
      password: string; // String!
      retype: string; // String!
    }
    updateAppointment: { // args
      appointmentID: string; // ID!
      status?: NexusGenEnums['status'] | null; // status
    }
    updateAppointmentSession: { // args
      appointment?: NexusGenInputs['appointmentInput'] | null; // appointmentInput
      appointmentID: string; // ID!
      link?: string | null; // String
      platform?: NexusGenEnums['platform'] | null; // platform
      status?: NexusGenEnums['status'] | null; // status
    }
    updateBlogsPost: { // args
      blog?: NexusGenInputs['blogInput'] | null; // blogInput
      blogsID: string; // ID!
    }
    updateContactNumber: { // args
      phone: NexusGenScalars['PhoneNumber']; // PhoneNumber!
      userID: string; // ID!
    }
    updateDateAppointment: { // args
      appointmentID: string; // ID!
      date: string; // String!
      time: string; // String!
    }
    updateEquipment: { // args
      equipment?: NexusGenInputs['equipmentInput'] | null; // equipmentInput
      equipmentID: string; // ID!
    }
    updateFAQs: { // args
      faqs: NexusGenInputs['faqsInput']; // faqsInput!
      faqsID: string; // ID!
    }
    updateOlPatient: { // args
      diagnosis: string; // String!
      prescription: string; // String!
      user?: NexusGenInputs['userInput'] | null; // userInput
      userID: string; // ID!
    }
    updatePassword: { // args
      current: string; // String!
      newpass: string; // String!
      userID: string; // ID!
    }
    updatePatientAccount: { // args
      firstname: string; // ID!
      lastname: string; // String!
      phone: NexusGenScalars['PhoneNumber']; // PhoneNumber!
      userID: string; // ID!
    }
    updatePatientDiagnosis: { // args
      diagnosis: string; // String!
      diagnosisID: string; // ID!
    }
    updatePrescription: { // args
      prescription?: NexusGenInputs['prescriptionInput'] | null; // prescriptionInput
      prescriptionID: string; // ID!
    }
    updateStaffAccount: { // args
      user?: NexusGenInputs['userInput'] | null; // userInput
      userID: string; // ID!
    }
    updateUserVerifiedAcc: { // args
      email: NexusGenScalars['EmailAddress']; // EmailAddress!
    }
    verifyOTP: { // args
      otp: string; // String!
    }
  }
  Query: {
    getAllAppointmentID: { // args
      appointmentID: string; // ID!
    }
    getAllEquipment: { // args
      inventories?: NexusGenEnums['inventory'] | null; // inventory
    }
    getAllFeedbackByUserId: { // args
      userID: string; // ID!
    }
    getAllPatientAppointment: { // args
      platform?: NexusGenEnums['platform'] | null; // platform
      status?: NexusGenEnums['status'] | null; // status
      userID: string; // ID!
    }
    getAllPhysioId: { // args
      userID: string; // ID!
    }
    getAllPhysioUserBySearch: { // args
      role?: NexusGenEnums['roles'] | null; // roles
      search: string; // String!
    }
    getAppointmentByDateTime: { // args
      date: string; // String!
      platform?: NexusGenEnums['platform'] | null; // platform
    }
    getAppointmentByPlatform: { // args
      platform?: NexusGenEnums['platform'] | null; // platform
    }
    getAppointmentByplatform: { // args
      platform?: NexusGenEnums['platform'] | null; // platform
    }
    getBlogSearch: { // args
      search: string; // String!
    }
    getDiagnosisID: { // args
      diagnosisID: string; // ID!
    }
    getFeedbackById: { // args
      feedbackID: string; // ID!
    }
    getFindFAQsQuestion: { // args
      search: string; // String!
    }
    getFindPrescription: { // args
      search: string; // String!
    }
    getInventoryBySearch: { // args
      search: string; // String!
    }
    getPhysioUserByRole: { // args
      limit: number; // Int!
      role?: NexusGenEnums['roles'] | null; // roles
      take: number; // Int!
    }
    getPrescriptionsById: { // args
      prescriptionID: string; // ID!
    }
    getReportsByPlatform: { // args
      dateFilter: string; // String!
      platform: NexusGenEnums['platform']; // platform!
    }
    getSearchuserByRole: { // args
      role?: NexusGenEnums['roles'] | null; // roles
      search: string; // String!
    }
  }
  Subscription: {
    InventorySubscriptions: { // args
      inventory?: NexusGenEnums['inventory'] | null; // inventory
    }
    UserSubscriptions: { // args
      role?: NexusGenEnums['roles'] | null; // roles
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
}