function pixelation(width, height, pixel_w, pixel_h) {
    gl.pixelation = gl.pixelation || new Shader(null, '\
    uniform sampler2D texture;\
    uniform float width;\
    uniform float height;\
    uniform float pixel_w;\
    uniform float pixel_h;\
    varying vec2 texCoord;\
    void main()\
    {\
      vec2 uv = texCoord;\
      vec3 tc = vec3(1.0, 0.0, 0.0);\
      float dx = pixel_w*(1./width);\
      float dy = pixel_h*(1./height);\
      vec2 coord = vec2(dx*floor(uv.x/dx),\
                        dy*floor(uv.y/dy));\
      tc = texture2D(texture, coord).rgb;\
      gl_FragColor = vec4(tc, 1.0);\
    }\
    ');

    simpleShader.call(this, gl.pixelation, {
        width: width,
        height: height,
        pixel_w: pixel_w,
        pixel_h: pixel_h
    });

    return this;
}
