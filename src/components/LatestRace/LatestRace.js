const LatestRace = ({ result, latestLoading }) => {
    return (
        <div className="latest-race">
            <h1>Latest Race Result</h1>
            {latestLoading && 'Loading results...'}
            {result &&
                <>
                    <a 
                    href={result.url} 
                    target='_blank'
                    rel="noreferrer"
                    >
                        {result.season} {result.raceName}
                    </a>
                    <ol>
                        {result.Results.map((position, idx) => {
                            return (<li key = {idx} className={position.Constructor.constructorId}>{`${position.Driver.givenName} ${position.Driver.familyName}`}</li>)
                        })}
                        {/* <li className={result.Results[0].Constructor.constructorId}>{`${result.Results[0].Driver.givenName} ${result.Results[0].Driver.familyName}`}</li>
                        <li className={result.Results[1].Constructor.constructorId}>{`${result.Results[1].Driver.givenName} ${result.Results[1].Driver.familyName}`}</li>
                        <li className={result.Results[2].Constructor.constructorId}>{`${result.Results[2].Driver.givenName} ${result.Results[2].Driver.familyName}`}</li> */}
                    </ol>
                </>
            }
        </div>
    );
};

export default LatestRace;