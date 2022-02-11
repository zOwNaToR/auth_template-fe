import RouteClass from "classes/RouteClass"
import { BASE_RESULT_STATUS } from "./constants"

type BaseAuthInfo = {
    token?: string;
    expireDate?: Date;
    refreshTokenHidden: boolean;
}

// Internal Responses
export type BaseResponseType = {
    status: BASE_RESULT_STATUS,
    message?: string,
}

// API Reponses
export type BaseAuthResponse_API = {
    success: boolean,
    errors: string[];
}

export type SendLinkResetPasswordResponse_API = BaseAuthResponse_API & {
    resetLink: string,
    resetPasswordToken: string,
}

export type AuthResponse_API = {
    data?: AuthResponseBody_API;
    isRequestCanceled: boolean;
}
export type AuthResponseBody_API = BaseAuthResponse_API & BaseAuthInfo & {
    userName: string;
    roles: string[];
}

// User
export type User = BaseAuthInfo & {
    userName?: string,
    isLoading: boolean,
    errorMessage?: string,
}

export type UserData = BaseAuthInfo & {
    userName?: string,
    isLoading: boolean,
}

// Props
export type WithClassName = {
    className?: string;
}

// Routes
export type Routes = {
    // Index and Auth
    INDEX: RouteClass,
    SIGNUP: RouteClass,
    LOGIN: RouteClass,
    CONFIRM_EMAIL: RouteClass,
    FORGOT_PASSWORD: RouteClass,
    RESET_PASSWORD: RouteClass,
}
export type RouteType = {
    component: React.VFC<{}>,
    path: string,
    isIndex: boolean,
    isAnonymous: boolean,
    routeParamNames?: string[],
}

// Entities
export type Patient = {
    id: string,
    name: string,
    sex: string,
    weight: number,
    height: number,
    laf: number,
    userId: string,
}
export type SmallPatient = Omit<Patient, 'sex' | 'weight' | 'height' | 'laf'>;

export type Diet = {
    id: string,
    name: string;
    creationDate: Date,
    sex: string,
    weight: number,
    height: number,
    laf: number,
    patientId: string;
}
export type DietFull = Diet & {
    patientName: string,
    nutrients: Nutrient[],
    dietFoods: DietFood[],
}

export type DietFood = {
    grams: number,
    order: number,
    dietId: string,
    foodId: string,
    dietFoodNutrients: DietFoodNutrient[],
}
export type DietFoodFull = DietFood & {
    foodName?: string,
    foodCategoryName?: string,
    foodCategoryId?: string,
}

export type DietFoodNutrient = {
    id: string,
    valuePerGrams: number,
    grams: number,
    nutrientId: string,
    foodId?: string,
    dietId?: string,
}

export type Nutrient = {
    id: string,
    name: string;
    label: string;
    order: number;
}