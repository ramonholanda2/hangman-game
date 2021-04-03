
const Notification = ({ showNotification }) => {
    return (
        <div className={`notification-container ${showNotification ? 'show' : ''}`} >
            <p>Você já inseriu esta carta</p>
        </div>
    )
}

export default Notification
