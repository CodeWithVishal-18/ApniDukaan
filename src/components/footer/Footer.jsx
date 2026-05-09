import { memo } from "react";

let Footer = memo(() => {
    return (
        <footer className={"py-3 text-center small bg-light text-dark border-top"}>
            © 2026 Apni Dukaan <i className="bi bi-dash-lg"></i> Built with <i className="bi bi-heart-fill text-danger"></i> by {" "}
            <a href="https://github.com/CodeWithVishal-18" target="_blank" rel="noopener noreferrer" className="fw-semibold text-decoration-none">
                <i className="bi bi-github me-1"></i>Vishal
            </a>
        </footer>
    )
})

export default Footer;