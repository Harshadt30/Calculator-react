import React, { useState } from 'react'

function History(props) {

    const [hideHistory, setHideHistory] = useState(false)

    return (
        <React.Fragment>
            <div className={hideHistory ? 'history-container-with-backdrop' : 'history-container-without-backdrop'}>
                <img src="/img/history.png" alt="" className="history" onClick={() => setHideHistory(!hideHistory)} />
                {
                    hideHistory &&
                    <span className="hide" onClick={() => setHideHistory(!hideHistory)} >&times;</span>
                }
                {
                    hideHistory &&
                    <div className="card">
                        {
                            props.history &&
                            props.history.map((item, i) => (
                                <div key={i} className="value-container">
                                    {
                                        item.length === 4 ?
                                            <div>
                                                <span className="values">{`${item[0]} ${item[1]} ${item[2]} `}</span>
                                                <span>=</span>
                                                <span className="values">{`${item[3]}`}</span>
                                            </div>
                                            :
                                            <div>
                                                <span className="values">{`${item[0]} `}</span>
                                                <span>=</span>
                                                <span className="values">{`${item[1]}`}</span>
                                            </div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                }

            </div>
        </React.Fragment>
    )
}

export default History
