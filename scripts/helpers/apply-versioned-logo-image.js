const LOGO_IMAGE_REGEX =
    /(?<commentStart><!-- AUTOGENERATED START logo-image -->).+?(?<commentEnd><!-- AUTOGENERATED END -->)/

function applyVersionedLogoImage(text, packageJson) {
    const version = JSON.parse(packageJson).version
    const hasPartsToUpdate = LOGO_IMAGE_REGEX.test(text) || !version
    const versionedLogoImage = `<img src="https://github.com/dcastil/tailwind-merge/raw/v${version}/assets/logo.svg" alt="tailwind-merge" width="221px" />`

    const updatedText = text.replace(
        LOGO_IMAGE_REGEX,
        `$<commentStart>${versionedLogoImage}$<commentEnd>`
    )

    return {
        hasPartsToUpdate,
        updatedText,
    }
}

module.exports = { applyVersionedLogoImage }
