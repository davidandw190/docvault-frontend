type Props = {
    lastLogin: string | number | Date;
};

/**
 * It displays the last login session of the user.
 * It shows the last login date and time.
 *
 * @component
 * @param {Props} props - Props including last login session.
 */
const LastLoginStatus: React.FC<Props> = ({ lastLogin }: Props) => {
    return (
        <div className="col-12">
            <label className="form-label">Last Login Session:</label>
            <ul className="list-group list-group-sm">
                <li className="list-group-item">
                    <div>
                        <small className="text-muted">
                            Your last session is when you last logged in
                        </small>
                        <h6 className="mb-0 mt-2">
                            {new Intl.DateTimeFormat('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            }).format(new Date(lastLogin))}
                        </h6>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default LastLoginStatus;
