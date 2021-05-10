export type TabsProps = {
    activeTab: number;
    tabs: {
        id: string;
        data: {
            title: string;
        };
    }[];
    onChange: (arg0: number) => void;
};
