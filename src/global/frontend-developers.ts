export enum DevelopersEnum {
    Devitskiy = 'n.devitskiy',
    Ermakov = 'ermakov',
    Mikhnenkov = 'mikhnenkovos',
    Nekludov = 'Serg',
    Posysaev = 'g.posysaev',
}
export const DEVELOPERS: DevelopersEnum[] = [
    DevelopersEnum.Devitskiy,
    DevelopersEnum.Ermakov,
    DevelopersEnum.Mikhnenkov,
    DevelopersEnum.Nekludov,
    DevelopersEnum.Posysaev,
];

export const DevelopersIdsMap = new Map<DevelopersEnum, number>([
    [DevelopersEnum.Devitskiy, 33],
    [DevelopersEnum.Ermakov, 128],
    [DevelopersEnum.Mikhnenkov, 181],
    [DevelopersEnum.Nekludov, 80],
    [DevelopersEnum.Posysaev, 35],
]);

export const DevelopersNamesMap = new Map<DevelopersEnum, string>([
    [DevelopersEnum.Devitskiy, 'Николай Девицкий'],
    [DevelopersEnum.Ermakov, 'Никита Ермаков'],
    [DevelopersEnum.Mikhnenkov, 'Олег Михненков'],
    [DevelopersEnum.Nekludov, 'Сергей Неклюдов'],
    [DevelopersEnum.Posysaev, 'Посысаев Георгий'],
]);

export const DevelopersCreateDateMap = new Map<DevelopersEnum, string>([
    [DevelopersEnum.Devitskiy, '2023-05-10T10:12:02.052Z'],
    [DevelopersEnum.Ermakov, '2024-06-10T10:25:04.570Z'],
    [DevelopersEnum.Mikhnenkov, '2024-12-02T11:15:00.565Z'],
    [DevelopersEnum.Nekludov, '2023-10-15T16:27:50.265Z'],
    [DevelopersEnum.Posysaev, '2023-05-10T10:13:26.003Z'],
]);

export const DevelopersCounOfIssuesMap = new Map<DevelopersEnum, number>([
    [DevelopersEnum.Devitskiy, 232],
    [DevelopersEnum.Ermakov, 123],
    [DevelopersEnum.Mikhnenkov, 22],
    [DevelopersEnum.Nekludov, 177],
    [DevelopersEnum.Posysaev, 407],
]);
