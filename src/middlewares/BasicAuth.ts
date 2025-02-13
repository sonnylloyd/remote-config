// src/middleware/BasicAuthMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { config } from "./../config"; // Import the config where authentication is defined

export class BasicAuthMiddleware {
  // Async Basic Authentication middleware function
  public static async authenticate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    // Check if authentication is enabled in the config
    if (!config.authentication) {
      // If authentication is disabled, allow the request to proceed
      return next(); // No further response, just move to the next middleware
    }

    const authHeader = req.headers["authorization"];

    // If Authorization header is missing, send 401 with Basic Auth prompt
    if (!authHeader) {
      res
        .status(401)
        .set("WWW-Authenticate", 'Basic realm="Restricted"')
        .send("Authentication required");
      return; // Ensure that after sending the response, we do not call next() or any further code.
    }

    const [authType, authValue] = authHeader.split(" ");

    // If the auth type isn't Basic, return 400 with an error message
    if (authType !== "Basic" || !authValue) {
      res
        .status(400)
        .set("WWW-Authenticate", 'Basic realm="Restricted"')
        .send("Invalid authorization format");
      return; // Ensure that after sending the response, we do not call next() or any further code.
    }

    try {
      // Decode the base64 encoded username:password pair
      const decodedCredentials = Buffer.from(authValue, "base64").toString(
        "utf-8",
      );
      const [user, pass] = decodedCredentials.split(":");

      // Compare the decoded credentials with the expected username and password from config
      if (user === config.username && pass === config.password) {
        return next(); // Credentials are valid, proceed to the next middleware/handler
      }

      // If credentials are invalid, return 401 Unauthorized
      res
        .status(401)
        .set("WWW-Authenticate", 'Basic realm="Restricted"')
        .send("Invalid credentials");
      return; // Ensure no further actions occur after sending the response.
    } catch (error) {
      // Catch any unexpected errors (e.g., decoding errors)
      res.status(500).send("Internal server error");
      return; // Ensure that after sending the response, we do not call next() or any further code.
    }
  }
}
