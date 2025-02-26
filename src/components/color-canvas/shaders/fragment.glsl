#define M_PI 3.1415926535897932384626433832795

varying vec2 vUv;

uniform float uProgress;
uniform float uFromBlur;
uniform float uToBlur;
uniform vec3 uPrevColor1;
uniform vec3 uPrevColor2;
uniform vec3 uPrevColor3;
uniform vec3 uPrevColor4;
uniform vec3 uPrevColor5;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform int uBackandForth;

void main() {
    // Set the current color as the base color.
    vec3 baseColor = vec3(0.0);
    vec3 shadeColor = vec3(0.0);
    
    // Set the width for each stripe (each stripe occupies 1/5 of the width)
    float stripeWidth = 1.0 / 5.0;
    float fromBlur = uFromBlur * 0.001 + 0.001;
    float toBlur = uToBlur * 0.001 + 0.001;

    // Remap progress to go from 0 to 1 to 0
    float blurProgress = uProgress;
    
    // Set base radius
    float radius = mix(fromBlur, toBlur, blurProgress);

    // Animate blur only when required, but it doesn't go below the blur value
    if (uBackandForth == 1) {
        // Changing things to make the blur go in and out
        blurProgress = sin(uProgress * M_PI);
        radius = mix(toBlur, fromBlur, blurProgress);  // Correcting radius assignment
    }

    // Smooth transitions for each stripe using smoothstep
    float stripe1 = smoothstep(stripeWidth * 1.0 - radius, stripeWidth * 1.0 + radius, vUv.x);
    float stripe2 = smoothstep(stripeWidth * 2.0 - radius, stripeWidth * 2.0 + radius, vUv.x);
    float stripe3 = smoothstep(stripeWidth * 3.0 - radius, stripeWidth * 3.0 + radius, vUv.x);
    float stripe4 = smoothstep(stripeWidth * 4.0 - radius, stripeWidth * 4.0 + radius, vUv.x);
    float stripe5 = smoothstep(stripeWidth * 5.0 - radius, stripeWidth * 5.0 + radius, vUv.x);

    // Interpolate the colors based on smoothstep results
    shadeColor = mix(uColor1, uColor2, stripe1);
    shadeColor = mix(shadeColor, uColor3, stripe2);
    shadeColor = mix(shadeColor, uColor4, stripe3);
    shadeColor = mix(shadeColor, uColor5, stripe4);
    shadeColor = mix(shadeColor, uColor5, stripe5);  // This overwrites the final color after all blends

    baseColor = mix(uPrevColor1, uPrevColor2, stripe1);
    baseColor = mix(baseColor, uPrevColor3, stripe2);
    baseColor = mix(baseColor, uPrevColor4, stripe3);
    baseColor = mix(baseColor, uPrevColor5, stripe4);
    baseColor = mix(baseColor, uPrevColor5, stripe5);  // This overwrites the final color after all blends

    // Final color with smooth progress blending
    vec3 color = mix(baseColor, shadeColor, uProgress);

    blurProgress = sin(uProgress * M_PI);
        radius = mix(toBlur, fromBlur, blurProgress);

    color = vec3(radius);
    
    // Output the final color
    csm_DiffuseColor = vec4(color, 1.0);
}
