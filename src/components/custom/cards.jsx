import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export const AuthCard = ({ title, children, className }) => {
  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
