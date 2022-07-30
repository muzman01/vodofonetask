import { useMediaQuery } from "react-responsive";

export default function GenderSelecktUpdate({
  handleLoginChange,
  genderError,
  checked,
}) {
  const view1 = useMediaQuery({
    query: "(min-width: 539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  return (
    <>
      {checked === "1" ? (
        <>
          <div
            className="reg_grid"
            style={{ marginBottom: `${genderError && !view3 ? "70px" : "0"}` }}
          >
            <label htmlFor="male">
              Male
              <input
                type="radio"
                name="gender"
                id="male"
                value="1"
                checked
                onChange={handleLoginChange}
              />
            </label>
            <label htmlFor="female">
              Female
              <input
                type="radio"
                name="gender"
                id="female"
                value="2"
                onChange={handleLoginChange}
              />
            </label>
            <label htmlFor="custom">
              Custom
              <input
                type="radio"
                name="gender"
                id="custom"
                value="3"
                onChange={handleLoginChange}
              />
            </label>
            {genderError && (
              <div
                className={
                  !view3
                    ? "input_error"
                    : "input_error input_error_select_large"
                }
              >
                <div
                  className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
                ></div>
                {genderError}
              </div>
            )}
          </div>
        </>
      ) : checked === "2" ? (
        <>
          <div
            className="reg_grid"
            style={{ marginBottom: `${genderError && !view3 ? "70px" : "0"}` }}
          >
            <label htmlFor="male">
              Male
              <input
                type="radio"
                name="gender"
                id="male"
                value="1"
                onChange={handleLoginChange}
              />
            </label>
            <label htmlFor="female">
              Female
              <input
                type="radio"
                name="gender"
                id="female"
                checked
                value="2"
                onChange={handleLoginChange}
              />
            </label>
            <label htmlFor="custom">
              Custom
              <input
                type="radio"
                name="gender"
                id="custom"
                value="3"
                onChange={handleLoginChange}
              />
            </label>
            {genderError && (
              <div
                className={
                  !view3
                    ? "input_error"
                    : "input_error input_error_select_large"
                }
              >
                <div
                  className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
                ></div>
                {genderError}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div
            className="reg_grid"
            style={{ marginBottom: `${genderError && !view3 ? "70px" : "0"}` }}
          >
            <label htmlFor="male">
              Male
              <input
                type="radio"
                name="gender"
                id="male"
                value="1"
                onChange={handleLoginChange}
              />
            </label>
            <label htmlFor="female">
              Female
              <input
                type="radio"
                name="gender"
                id="female"
                value="2"
                onChange={handleLoginChange}
              />
            </label>
            <label htmlFor="custom">
              Custom
              <input
                type="radio"
                name="gender"
                id="custom"
                value="3"
                checked
                onChange={handleLoginChange}
              />
            </label>
            {genderError && (
              <div
                className={
                  !view3
                    ? "input_error"
                    : "input_error input_error_select_large"
                }
              >
                <div
                  className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
                ></div>
                {genderError}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
