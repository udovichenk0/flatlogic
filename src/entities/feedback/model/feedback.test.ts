import {expect, test, vi} from "vitest";
import {allSettled, fork} from "effector";
import {createFeedbackModel} from "@/entities/feedback";

const reviews = [
    {
        comment: "sdfsdfasdf",
        userId: "xVoU1CfS4uLTgPz3gkJK",
        rate: 3,
        avatar_url: "https://flatlogic-ecommerce.herokuapp.com/_next/static/images/avatar-0dc1644847fbbf98f329c7b6b8443391.svg",
        fullname: "Michael Daineka",
        date: {
            seconds: 1676728016,
            nanoseconds: 187000000
        }
    }
]


test('feedback', async () => {
    const $$feedback = createFeedbackModel()
    const fn = vi.fn(() => reviews)
    const scope = fork({
        values: [
            [$$feedback.$reviews, []],
        ],
        handlers: [
            [$$feedback.getReviewsFx, fn]
        ]
    })

    await allSettled($$feedback.getReviews, {
        scope,
        params: {
            userId:'userId',
            productId: 'productId'
        }
    })
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledWith({userId: 'userId', productId: 'productId'})
    expect(scope.getState($$feedback.$reviews)).toEqual(reviews)
})