import { useMediaQuery } from "react-responsive";

export default function AperatorSelect({ handleLoginChange, genderError }) {
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
    <div
      className="reg_grid"
      style={{ marginBottom: `${genderError && !view3 ? "70px" : "0"}` }}
    >
      <label htmlFor="male">
      Vodafone
        <input
          type="radio"
          name="oparetor"
          id="vodafone"
          value="Vodafone"
          onChange={handleLoginChange}
        />
      </label>
      <label htmlFor="female">
        Turkcell
        <input
          type="radio"
          name="oparetor"
          id="turkcell"
          value="Turkcell"
          onChange={handleLoginChange}
        />
      </label>
      <label htmlFor="custom">
        Turk Telekom
        <input
          type="radio"
          name="oparetor"
          id="telekom"
          value="TurkTelekom"
          onChange={handleLoginChange}
        />
      </label>
      {genderError && (
        <div
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {genderError}
        </div>
      )}
    </div>
  );
}
