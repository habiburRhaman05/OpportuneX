import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Archive, Dot, Target } from "lucide-react";

const AchievementsCard = ({ achivements }) => {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/70 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          My Achievements
        </CardTitle>
      </CardHeader>
      {achivements ? (
        <CardContent className="space-y-4">
          {achivements.map((item, index) => (
            <div
              key={item.label}
              className=" bg-zinc-800/50 rounded-lg hover:bg-zinc-800/70 transition-all duration-300 transform hover:scale-105"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <span className="flex items-center p-2 ">
                <Dot /> {item}
              </span>
            </div>
          ))}
        </CardContent>
      ) : (
        <h1>please add you achivements</h1>
      )}
    </Card>
  );
};

export default AchievementsCard;
