export function fullNameToShort(fullName: string){
    const nameArray = fullName.split(' ')
    return `${nameArray[0]} ${nameArray[1][0]}. ${nameArray[2][0]}.`
}
