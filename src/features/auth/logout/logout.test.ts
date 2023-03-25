import {expect, test, vi} from "vitest";
import {allSettled, fork} from "effector";
import {sessionModel} from '@/entities/session'
import {logoutFx, logoutTriggered} from "@/features/auth/logout/logout.model";

const  User1 = {
    avatar_url: 'string',
    billing_address: 'string',
    delivery_address: 'string',
    payment_method: 'string',
    cart: [{
        description: 'string',
        id: 'string',
        price: 1,
        title: 'string',
        type: 'string',
        url: 'string',
    }],
    email: 'string',
    name: 'string',
    surname: 'string',
    id: 'string',
    role: 'string',
};


test('logout', async () => {
    const fn = vi.fn()
    const scope = fork({
        values: [
            [sessionModel.$session, User1]
        ],
        handlers: [
            [logoutFx, fn]
        ]
    })

    await allSettled(logoutTriggered, {scope})

    expect(fn).toHaveBeenCalled()
    expect(scope.getState(sessionModel.$session)).toStrictEqual({})
})