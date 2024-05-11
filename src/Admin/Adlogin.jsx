import React from 'react'

function Adlogin() {
    return (
        <div>
            <br /><br /><br />
            <center>

                <fieldset>
                    {/* Form Name */}
                    <h1>Login your'e Account</h1>
                    {/* Text input*/}
                    <div className="form-group"><br /><br />
                        <label className="col-md-4 control-label" htmlFor="Enter youre Name">
                            <h5>Enter your'e Name</h5>
                        </label>
                        <div className="col-md-4">
                            <input
                                id="Enter youre Name"
                                name="Enter youre Name"
                                type="text"
                                placeholder=""
                                className="form-control input-md"
                                required=""
                            /> <br />

                        </div>
                    </div>
                    {/* Password input*/}
                    <div className="form-group"><br />
                        <label className="col-md-4 control-label">
                            <h5>Enter your'e password</h5>
                        </label>
                        <div className="col-md-4">
                            <input
                                id="Enter you'r Password"
                                name="Enter you'r Password"
                                type="password"
                                className="form-control input-md"
                                required=""
                            />

                        </div>
                    </div>
                    {/* Button */}
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="singlebutton" />
                        <div className="col-md-4">
                            <button
                                id="singlebutton"
                                name="singlebutton"
                                className="btn btn-primary"
                            >
                                Button
                            </button>
                        </div>
                    </div>
                </fieldset>
            </center>

        </div>
    )
}

export default Adlogin