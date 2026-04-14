
import { SlashIcon } from 'lucide-react'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '../ui/breadcrumb'
import { Link } from 'react-router';

interface IProps {
    currentPage: string;
    breadcrumbs?: IBreadcrumb[];
}

interface IBreadcrumb {
    label: string;
    to: string
}

export const CustomBreadcrumps = ({ currentPage, breadcrumbs = [] }: IProps) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/">Inicio</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {
                    breadcrumbs.map((breadcrumb, index) => (
                        <div className="flex items-center" key={index}>

                            <BreadcrumbItem >
                                <BreadcrumbSeparator>
                                    <SlashIcon />
                                </BreadcrumbSeparator>
                                <BreadcrumbLink asChild>
                                    <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                        </div>
                    ))
                }

                <BreadcrumbSeparator>
                    <SlashIcon />
                </BreadcrumbSeparator>

                <BreadcrumbItem className="capitalize font-semibold">
                    <BreadcrumbLink>{currentPage}</BreadcrumbLink>
                </BreadcrumbItem>

            </BreadcrumbList>
        </Breadcrumb>
    )
}
