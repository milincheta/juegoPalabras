if (Meteor.isServer){
  // Global API config
  var Api = new Restivus({
    //useDefaultAuth: true,
    prettyJson: true
  });

  // Get All collection http://localhost:3000/api/frases
  Api.addCollection(Frases);

  // Get by Param
  Api.addRoute('getByParam/:clave', {authRequired: false}, {
      get: function () {
        var palabraClave = this.urlParams.clave;
        console.log("getByParam, name param is: ", palabraClave);
        var frases = Frases.findOne({palabraClave: palabraClave});
        if (frases) {
          return {
            statusCode: 200,
            body: {message: 'Frases con nivel ' + palabraClave, result: frases}
          };
        }
        else {
          return {
            statusCode: 404,
            body: {message: "No se pudo encontrar frases con nivel " + palabraClave}
          };
        }
      },
      post: function () {
        console.log("post to customEndpoint");
      }
    });
}
