import * as express from "express"
declare global {
    namespace Express {
        interface Request {
            customer? : Record<string,any>
        }
    }
}

declare global {
    namespace Express {
        interface Request {
            seller? : Record<string,any>
        }
    }
}