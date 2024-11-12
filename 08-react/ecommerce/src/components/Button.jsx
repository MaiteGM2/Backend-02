export default function Button({action, id, state, children}) {
    console.log({state})
    return <button onClick={action} id={id} disabled={state}>{children}</button>
}