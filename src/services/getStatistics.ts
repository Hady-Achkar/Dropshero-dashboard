import {AxiosResponse} from "axios";
import {AdminAxios} from "../lib";
import {ApiConstants} from "../constants";
import {BundleType} from "../types";

export const getStatistics = (): Promise<AxiosResponse<GetStatistics.RootObject>> => {
    return AdminAxios({
        method: 'GET',
        url: ApiConstants.ADMIN.GET_STATISTICS
    })
}

export declare namespace GetStatistics {

    export interface LatestCustomer {
        status: string;
        _id: string;
        email: string;
        fname: string;
        lname: string;
        type: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        stripeId: string;
        bundleType: BundleType
        activeSubscription: string;
    }

    export interface FeeDetail {
        amount: number;
        application?: any;
        currency: string;
        description: string;
        type: string;
    }

    export interface LatestTransaction {
        id: string;
        object: string;
        amount: number;
        available_on: number;
        created: number;
        currency: string;
        description: string;
        exchange_rate?: number;
        fee: number;
        fee_details: FeeDetail[];
        net: number;
        reporting_category: string;
        source: string;
        status: string;
        type: string;
    }

    export interface Admin {
        role: string;
        image: string;
        _id: string;
        email: string;
        fullName: string;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface Metadata {
    }

    export interface Coupon {
        id: string;
        object: string;
        amount_off?: any;
        created: number;
        currency?: any;
        duration: string;
        duration_in_months?: any;
        livemode: boolean;
        max_redemptions?: any;
        metadata: Metadata;
        name: string;
        percent_off: number;
        redeem_by?: any;
        times_redeemed: number;
        valid: boolean;
    }

    export interface Metadata2 {
    }

    export interface Restrictions {
        first_time_transaction: boolean;
        minimum_amount?: any;
        minimum_amount_currency?: any;
    }

    export interface ActivePromo {
        id: string;
        object: string;
        active: boolean;
        code: string;
        coupon: Coupon;
        created: number;
        customer?: any;
        expires_at?: any;
        livemode: boolean;
        max_redemptions?: any;
        metadata: Metadata2;
        restrictions: Restrictions;
        times_redeemed: number;
    }

    export interface SourceTypes {
        card: number;
    }

    export interface Available {
        amount: number;
        currency: string;
        source_types: SourceTypes;
    }

    export interface SourceTypes2 {
        card: number;
    }

    export interface Pending {
        amount: number;
        currency: string;
        source_types: SourceTypes2;
    }

    export interface Balance {
        available: Available[];
        pending: Pending[];
    }

    export interface Subscribers {
        total: number;
        monthly: number;
        one_time: number;
    }

    export interface Counts {
        products: number;
        subscribers: Subscribers;
        nonSubscribers: number;
        expiredSubscribers: number;
    }

    export interface Data {
        latestCustomers: LatestCustomer[];
        latestTransactions: LatestTransaction[];
        admins: Admin[];
        activePromos: ActivePromo[];
        balance: Balance;
        counts: Counts;
    }

    export interface RootObject {
        status: 'Success' | 'Failure';
        message: string;
        data: Data;
    }

}

