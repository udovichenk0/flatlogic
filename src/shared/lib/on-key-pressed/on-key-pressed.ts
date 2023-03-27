
import {createEvent, createStore, sample, Store, Unit, Event} from "effector";
import {KeyboardEvent} from "react";
const keyPressed = createEvent<KeyboardEvent>()
if(document){
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.addEventListener('keyup', evt=> keyPressed(evt))
}



export const hotkey = ({key, filter, target}:{key: string, filter?: Store<boolean>, target?: Unit<any>}) => {
    const triggeredEvent = sample({
        clock: keyPressed,
        filter: (keyboard) => {
            return key === keyboard.key
        }
    })
    if(target){
        sample({
            clock: triggeredEvent,
            filter: filter ? filter : createStore(true),
            target
        })
    }
    return triggeredEvent
}