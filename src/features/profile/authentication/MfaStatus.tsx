type Props = {
    isMfaEnabled: boolean;
    qrCodeImageUri: string | undefined;
    isQrCodeSuccess: boolean;
    isQrCodeLoading: boolean;
};

/**
 * It handles MFA status rendering.
 * It displays the QR code image for scanning to set up MFA.
 *
 * @component
 * @param {Props} props - Props including MFA status, QR code image URI, and loading state.
 */
const MfaStatus: React.FC<Props> = ({
    isMfaEnabled,
    qrCodeImageUri,
    isQrCodeSuccess
}: // isQrCodeLoading,
Props) => {
    return (
        <>
            {isMfaEnabled && (
                <div className="accordion mt-3 mb-3" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            >
                                QR Code to scan
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className={`accordion-collapse collapse ${
                                isQrCodeSuccess ? 'show' : undefined
                            }`}
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                <p className="small text-muted fw-semibold fs-6 text">
                                    Use an authenticator application on your phone to scan this QR
                                    Code to set up MFA Authentication.
                                </p>
                                <hr className="my-4" />
                                <img
                                    src={qrCodeImageUri}
                                    className="rounded mx-auto d-block"
                                    alt="QR Code"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MfaStatus;
