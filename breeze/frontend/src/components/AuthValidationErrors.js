const AuthValidationErrors = ({ errors = [], ...props }) => (
    <>
        {errors.length > 0 && (
            <div {...props}>
{errors.length > 1 ? (
                <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                ) : (
                <div className="mt-3 text-sm text-red-600">
                    {errors[0]}
                </div>
                )}
            </div>
        )}
    </>
)
/*

                <div className="font-medium text-red-600">
                    Whoops! Something went wrong.
                </div>
*/
export default AuthValidationErrors
