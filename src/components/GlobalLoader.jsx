import { useLoader } from "../context/LoaderContext";

export default function GlobalLoader() {
    const { loading } = useLoader();
    if (!loading) return null;

    const delays = [0.06, 0.12, 0.18, 0.32, 0.12, 0.38, 0.26, 0.20, 0.44];

    const overlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.16)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        zIndex: 2147483647,
        pointerEvents: "auto",
    };

    const boxStyle = {
        width: 100,
        height: 100,
        background: "#ffffff",
        borderRadius: 20,
        boxShadow: "0 30px 60px rgba(10,20,50,0.12)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        transform: "translateZ(0)",
    };

    const gridStyle = {
        width: 70,
        height: 70,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 0,
        marginBottom: 0,
    };

    const blockBase = {
        width: 20,
        height: 20,
        borderRadius: 4,
        boxShadow: "0 6px 18px rgba(0,51,255,0.09)",
        background: "#FFFFFF",
        opacity: 1,
    };

    return (
        <>
            <style>{`
        @keyframes gl_show {
          from, 40% { opacity: 0; }
          41%, to { opacity: 1; }
        }
        @keyframes gl_pulse {
          from, 40% { background: #ffffff; }
          to { background: #000000; } /* soft lavender */
        }
        .gl-block { display: inline-block; }
      `}</style>

            <div style={overlayStyle}>
                <div style={boxStyle}>
                    <div style={gridStyle}>
                        {Array.from({ length: 9 }).map((_, i) => {
                            const style = {
                                ...blockBase,
                                animation: `gl_show 1s step-end ${delays[i]}s infinite alternate, gl_pulse 1s linear ${delays[i]}s infinite alternate`,
                            };
                            return <span key={i} className="gl-block" style={style} />;
                        })}
                    </div>

                    <div style={{ color: "#000000", fontWeight: 400, fontSize: 13, marginTop: 10 }}>
                        Loading...
                    </div>
                </div>
            </div>
        </>
    );
}
