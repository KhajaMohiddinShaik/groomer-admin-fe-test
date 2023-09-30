import '../App.css';
import TimePicker from './TimePicker';

function LunchTimings({ inputs, setInputs, isReadOnly }) {

    return (
        <div className="form-group">
            <label className="label">Lunch Timings:</label>
            <div className="input" style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    {/* TimePicker component for selecting lunch time */}
                    <div className='select-wrapper' style={{ background: "rgba(123, 123, 123, 0.25)", padding: "0px 5px 0px 10px", borderRadius: "20px" }}>
                        {/* Use the TimePicker component to set lunch_time */}
                        <TimePicker timeperiods={['PM']} inputs={inputs} setInputs={setInputs} label="lunch_time" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LunchTimings;