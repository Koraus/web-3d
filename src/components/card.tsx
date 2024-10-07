export const Card = ({
    img,
    imgAlt,
    title,
    link,
    subtitle,
}: {
    img: string,
    imgAlt: string,
    title: string,
    link: string,
    subtitle: string,
}) => {
    return <div className="card">
        <img src={img} alt={imgAlt} className="card-img" />
        <h1 className="card-title">{title}</h1>
        <p className="card-subtitle">{subtitle}</p>
        <a href={link} className="card-linl">Link</a>
    </div>
};