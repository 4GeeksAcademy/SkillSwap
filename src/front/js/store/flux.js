const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      auth: {
        token: null,
        isAuthenticated: false,
        user: null,
      },
    },
    actions: {
      verifyToken: async (token) => {
        try {
          const resp = await fetch(`${process.env.BACKEND_URL}/api/verify`, {
            method: "GET",
            credentials: "include",
          });
          const data = await resp.json();

          if (resp.ok && data.valid) {
            setStore({
              auth: {
                token: token,
                isAuthenticated: true,
                user: data.user,
              },
            });
          } else {
            setStore({
              auth: {
                token: null,
                isAuthenticated: false,
                user: null,
              },
            });
          }
          return data;
        } catch (error) {
          console.error("Error validating token:", error);
          setStore({
            auth: {
              token: null,
              isAuthenticated: false,
              user: null,
            },
          });
        }
      },

      signup: async (name, last_name, email, password) => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name, last_name, email, password }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || "Sign up failed. Please check your input.");
          }

          const data = await response.json();
          console.log("Signup successful:", data);

          setStore({
            auth: {
              token: data.token,
              isAuthenticated: true,
              user: data.user,
            },
          });

          return data;

        } catch (error) {
          console.error("Error signing up:", error);
        }
      },

      login : async (email, password) => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || "Login failed. Please check your input.");
          }

          const data = await response.json();
          console.log("Login successful:", data);

          setStore({
            auth: {
              token: data.token,
              isAuthenticated: true,
              user: data.user,
            },
          });

          return data;
        } catch (error) {
          console.error("Error logging in:", error);
        }
      },

      logout: async () => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/logout`, {
            method: "POST",
            credentials: "include",
          });

          if (response.ok) {
            console.log("Logout successful");
            setStore({
              auth: {
                token: null,
                isAuthenticated: false,
                user: null,
              },
            });
          } else {
            console.error("Error logging out");
          }
        } catch (error) {
          console.error("Error on logout:", error);
        }
      },
    },
  };
};

export default getState;
