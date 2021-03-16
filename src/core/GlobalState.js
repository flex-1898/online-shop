export class GlobalState {
    constructor(initialState) {
        this.state = initialState;
        this._prevState = { ...initialState };
        this._subscribers = [];
    }

    _notifySubscribers() {
        for (const subscriber of this._subscribers) {
            subscriber._render(this._prevState, this.state);
        }
    }

    subscribe(subscriber) {
        this._subscribers.push(subscriber);
    }

    setState(updatedState) {
        const nextState =
            typeof updatedState === 'function' ? updatedState(this.state) : updatedState;

        this._prevState = { ...this.state };
        this.state = { ...this.state, ...nextState };

        this._notifySubscribers();
    }
}
