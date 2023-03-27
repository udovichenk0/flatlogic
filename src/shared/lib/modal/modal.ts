import {createEvent, createStore, sample} from "effector";

import {hotkey} from "@/shared/lib/on-key-pressed";

export const createModal = ({
    closeOnOverlayClick = true,
    closeOnEsc = true
}: {
    closeOnOverlayClick?:boolean,
    closeOnEsc?:boolean
}) => {
    const $isOpened = createStore(false);
    const close = createEvent();
    const open = createEvent();

    sample({
        clock: open,
        fn: () => true,
        target: $isOpened,
    });

    sample({
        clock: close,
        fn: () => false,
        target: $isOpened,
    });



    // Close modal on Esc
    if(closeOnEsc){
        hotkey({
            key: 'Escape',
            target: close
        })
    }


    const closeOnOverlayClickTriggered = createEvent<{
        ref: HTMLInputElement | null;
        target: EventTarget;
    }>();

    if (closeOnOverlayClick) {
        sample({
            clock: closeOnOverlayClickTriggered,
            filter: ({ ref, target }) => ref === target,
            target: close,
        });
    }
    return {
        $isOpened,
        close,
        open,
        closeOnOverlayClickTriggered,
    };
};

