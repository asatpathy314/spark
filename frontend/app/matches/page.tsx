"use client"
import React from 'react';
import CustomCard from "@/components/card";
import { useSession } from "next-auth/react";
import { title } from '@/components/primitives';

interface Props {
    name: string;
    email: string;
    profile: string;
}

export default function MatchPage() {
    const sample_data = {
        one: {
            name: "Rishan Biju",
            emailAddress: "rishanbiju@gmail.com",
            link: "linkedin.com",
			college: "uva"
        },
        two: {
            name: "Abhishek Satpathy",
            emailAddress: "asatpathy314@gmail.com",
            link: "linkedin.com",
			college: "uva"
        },
        three: {
            name: "Joey Chen",
            emailAddress: "joeychen@gmail.com",
            link: "linkedin.com",
			college: "uva"
        }
    }
    const data = sample_data;
    const { data: session } = useSession();

    return (
        <div>
            <h1 className = {title()}>Congratulations, you matched with:</h1>
            <section className="card-container py-10 px-10">
                <CustomCard
                    name={data["one"]["name"]}
                    email={data["one"]["emailAddress"]}
                    link={data["one"]["link"]}
					college={data["one"]["college"]}
                />
                <CustomCard
                    name={data["two"]["name"]}
                    email={data["two"]["emailAddress"]}
                    link={data["two"]["link"]}
					college={data["two"]["college"]}

                />
                <CustomCard
                    name={data["three"]["name"]}
                    email={data["three"]["emailAddress"]}
                    link={data["three"]["link"]}
					college={data["two"]["college"]}

                />
            </section>
            <style jsx>{`
                .card-container {
                    display: flex;
                    justify-content: center;
                    gap: 16px;
                }
                .card-container > :global(.custom-card) {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .card-container > :global(.custom-card) > :global(.card) {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
            `}</style>
        </div>
    );
}
