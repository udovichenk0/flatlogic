import { Feedback } from "@/shared/api/feedback";

export function isFeedbackAlreadyCommented({ feedbacks, userId }: { feedbacks:Feedback[], userId: string }) {
	return Boolean(feedbacks.find(feedback => feedback.userId == userId))	
}