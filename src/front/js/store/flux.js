const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      auth: {
        token: null,
        isAuthenticated: false,
        user: null,
      },
    },
    actions: {
      // Acción para validar el token de autenticación
      validateToken: async (token) => {
        try {
          const resp = await fetch(`${process.env.BACKEND_URL}/verify`, {
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

      // Acción para cerrar sesión y limpiar el estado de autenticación
      logout: () => {
        setStore({
          auth: {
            token: null,
            isAuthenticated: false,
            user: null,
          },
        });
      },
    },
  };
};

export default getState;
